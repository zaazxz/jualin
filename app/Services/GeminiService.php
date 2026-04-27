<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';
    protected $model;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
        $this->model  = config('services.gemini.model', 'gemini-flash-latest');
    }

    public function generateSalesContent($productName, $description, $audience, $tone, $webName = null, $brandColor = null)
    {
        $brandColor = $brandColor ?: '#10b981';
        $webName = $webName ?: $productName;

        $prompt = "Buat landing page premium untuk produk: {$productName}.\n"
            . "Deskripsi: {$description}\n"
            . "Target: {$audience}\n"
            . "Tone: {$tone}\n"
            . "Nama Website: {$webName}\n"
            . "Warna Brand Utama: {$brandColor}\n\n"
            . "Tugas Anda adalah menghasilkan JSON yang berisi:\n"
            . "1. 'copy': Objek berisi headline, subheadline, cta, dan hero_image (Unsplash URL).\n"
            . "2. 'html_content': STRING HTML UTUH untuk bagian utama landing page (tanpa <html>/<body>, langsung <div> utama saja).\n"
            . "   - Gunakan Tailwind CSS CLASSES untuk semua styling.\n"
            . "   - Buat layout yang UNIK dan DINAMIS (jangan hanya template standar).\n"
            . "   - Sertakan animasi Tailwind (seperti animate-bounce, hover:scale-105, dsb).\n"
            . "   - Gunakan warna {$brandColor} sebagai aksen utama pada tombol, border, atau icon.\n"
            . "   - Pastikan responsive (mobile friendly).\n\n"
            . "Balas HANYA dengan JSON valid:\n"
            . '{
                "copy": {"headline": "...", "subheadline": "...", "cta": "...", "hero_image": "...", "web_name": "..."},
                "html_content": "...",
                "templates": [
                    {"id": "t1", "name": "Modern AI Custom", "bg_color": "#ffffff", "text_color": "#1e293b", "accent_color": "' . $brandColor . '", "font_family": "Sans"}
                ]
            }';

        try {
            $response = Http::withoutVerifying()
                ->timeout(90)
                ->post($this->baseUrl . $this->model . ':generateContent?key=' . $this->apiKey, [
                    'contents' => [['role' => 'user', 'parts' => [['text' => $prompt]]]],
                    'generationConfig' => [
                        'temperature' => 0.9, // Sedikit lebih tinggi agar lebih kreatif
                        'maxOutputTokens' => 8192,
                        'responseMimeType' => 'application/json', 
                    ],
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

                if ($text) {
                    $decoded = json_decode($text, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        return $decoded;
                    }
                }
            }

            Log::error('Gemini API Error: ' . $response->status() . ' - ' . $response->body());
            return null;

        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            return null;
        }
    }
}
