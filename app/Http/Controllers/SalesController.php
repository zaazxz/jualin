<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sales::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(6); // Use pagination for performance

        return Inertia::render('Dashboard/Index', [
            'sales' => $sales
        ]);
    }

    /**
     * Display all projects.
     */
    public function projects()
    {
        $sales = Sales::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('Dashboard/Projects', [
            'sales' => $sales
        ]);
    }

    /**
     * Display analytics.
     */
    public function analytics(Sales $sales = null)
    {
        if ($sales && $sales->user_id !== Auth::id()) {
            abort(403);
        }

        if (!$sales) {
            $sales = Sales::where('user_id', Auth::id())
                ->orderBy('created_at', 'desc')
                ->first();
        }

        return Inertia::render('Dashboard/Analytics', [
            'sales' => $sales
        ]);
    }

    /**
     * Generate AI content and templates.
     */
    public function generate(Request $request, GeminiService $gemini)
    {
        // Backend enforcement of limit (Max 5 pages)
        // Jika sedang edit (ada sales_id), jangan blokir
        $salesId = $request->input('sales_id');
        $count = Sales::where('user_id', Auth::id())
            ->when(!$salesId, function($query) {
                return $query;
            })
            ->when($salesId, function($query) use ($salesId) {
                return $query->where('id', '!=', $salesId);
            })
            ->count();

        if ($count >= 5) {
            return response()->json(['error' => 'Limit AI tercapai (Maksimal 5 halaman). Hapus salah satu proyek untuk membuat yang baru.'], 403);
        }

        set_time_limit(180); // Berikan waktu lebih untuk AI berkreasi

        $validated = $request->validate([
            'product_name' => 'required|string',
            'description' => 'required|string',
            'audience' => 'nullable|string',
            'tone' => 'nullable|string',
            'web_name' => 'nullable|string',
            'brand_color' => 'nullable|string',
            'features' => 'nullable|string',
            'price' => 'nullable|string',
            'language' => 'nullable|string',
        ]);

        $result = $gemini->generateSalesContent(
            $validated['product_name'],
            $validated['description'],
            $validated['audience'] ?? 'Umum',
            $validated['tone'] ?? 'Profesional',
            $validated['web_name'] ?? null,
            $validated['brand_color'] ?? null,
            $validated['features'] ?? null,
            $validated['price'] ?? null,
            $validated['language'] ?? 'id'
        );

        if (!$result['success']) {
            return response()->json(['error' => $result['error']], 500);
        }

        return response()->json($result['data']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_info' => 'required|array',
            'generated_content' => 'nullable|array',
            'template' => 'nullable|string',
        ]);

        // Double check limit before storing new
        if (Sales::where('user_id', Auth::id())->count() >= 5) {
            return redirect()->back()->withErrors(['message' => 'Limit tercapai.']);
        }

        $sales = Sales::create([
            'user_id' => Auth::id(),
            'product_name' => $validated['product_name'],
            'product_info' => $validated['product_info'],
            'generated_content' => $validated['generated_content'] ?? null,
            'template' => $validated['template'] ?? 'modern',
            'html_content' => $request->input('html_content'), // Simpan HTML dinamis
            'status' => 'draft',
            'slug' => Str::slug($validated['product_name']) . '-' . Str::random(6),
        ]);

        return redirect()->route('dashboard')->with('success', 'Halaman berhasil disimpan!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sales $sales)
    {
        if ($sales->user_id !== Auth::id()) {
            abort(403);
        }

        // KUNCI: Jika sudah published, hanya boleh ubah STATUS (untuk unpublish). 
        // Data lain (nama, info, html) tetap terkunci.
        if ($sales->status === 'published' && !$request->has('status')) {
            return $request->wantsJson() 
                ? response()->json(['error' => 'Proyek yang sedang dipublikasikan tidak dapat diubah datanya. Ubah status ke Draft terlebih dahulu.'], 403)
                : redirect()->back()->withErrors(['message' => 'Proyek yang sedang dipublikasikan tidak dapat diubah datanya. Ubah status ke Draft terlebih dahulu.']);
        }

        if ($sales->status === 'published' && $request->hasAny(['product_name', 'product_info', 'generated_content', 'template', 'html_content'])) {
             // Block if trying to change content while published
             return $request->wantsJson() 
                ? response()->json(['error' => 'Proyek yang sedang dipublikasikan tidak dapat diubah datanya. Ubah status ke Draft terlebih dahulu.'], 403)
                : redirect()->back()->withErrors(['message' => 'Proyek yang sedang dipublikasikan tidak dapat diubah datanya. Ubah status ke Draft terlebih dahulu.']);
        }

        $validated = $request->validate([
            'product_name' => 'sometimes|required|string|max:255',
            'product_info' => 'sometimes|required|array',
            'generated_content' => 'nullable|array',
            'template' => 'nullable|string',
            'status' => 'nullable|string|in:draft,downloaded,published',
        ]);

        $updateData = [];
        if ($request->has('product_name')) $updateData['product_name'] = $validated['product_name'];
        if ($request->has('product_info')) $updateData['product_info'] = $validated['product_info'];
        if ($request->has('generated_content')) $updateData['generated_content'] = $validated['generated_content'];
        if ($request->has('template')) $updateData['template'] = $validated['template'];
        if ($request->has('html_content')) $updateData['html_content'] = $request->input('html_content');
        if ($request->has('status')) $updateData['status'] = $validated['status'];

        $sales->update($updateData);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'sales' => $sales]);
        }

        return redirect()->route('dashboard')->with('success', 'Halaman berhasil diperbarui!');
    }

    /**
     * Display the specified resource (Live Preview).
     */
    public function show($slug)
    {
        $sales = Sales::where('slug', $slug)->firstOrFail();

        return Inertia::render('Sales/Preview', [
            'sales' => $sales
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sales $sales)
    {
        if ($sales->user_id !== Auth::id()) {
            abort(403);
        }

        if ($sales->status === 'published') {
            return redirect()->back()->withErrors(['message' => 'Proyek yang sudah dipublikasikan tidak dapat dihapus.']);
        }

        $sales->delete();

        return redirect()->back()->with('success', 'Halaman berhasil dihapus!');
    }

    /**
     * Get daily AI insight
     */
    public function dailyInsight(Request $request, GeminiService $gemini)
    {
        $language = $request->input('language', 'id');
        $userName = Auth::user()->name;

        $insight = $gemini->generateDailyInsight($language, $userName);

        if (!$insight) {
            return response()->json(['error' => 'Failed to generate insight'], 500);
        }

        return response()->json($insight);
    }
}
