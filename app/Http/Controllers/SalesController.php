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
            ->get();

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
            ->get();

        return Inertia::render('Dashboard/Projects', [
            'sales' => $sales
        ]);
    }

    /**
     * Display analytics.
     */
    public function analytics()
    {
        $sales = Sales::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard/Analytics', [
            'sales' => $sales
        ]);
    }

    /**
     * Generate AI content and templates.
     */
    public function generate(Request $request, GeminiService $gemini)
    {
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

        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_info' => 'required|array',
            'generated_content' => 'nullable|array',
            'template' => 'nullable|string',
        ]);

        $sales->update([
            'product_name' => $validated['product_name'],
            'product_info' => $validated['product_info'],
            'generated_content' => $validated['generated_content'] ?? null,
            'template' => $validated['template'] ?? 'modern',
            'html_content' => $request->input('html_content'),
        ]);

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
