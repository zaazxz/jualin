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

    public function generateSalesContent($productName, $description, $audience, $tone)
    {
        $prompt = "Buat landing page copywriting + 3 variasi desain untuk produk berikut:\n"
            . "Produk: {$productName}\n"
            . "Deskripsi: {$description}\n"
            . "Target: {$audience}\n"
            . "Tone: {$tone}\n\n"
            . "Balas HANYA dengan JSON valid (tanpa markdown, tanpa ```json, langsung JSON saja):\n"
            . '{"copy":{"headline":"...","subheadline":"...","description":"...","benefits":["...","...","..."],"cta":"..."},'
            . '"templates":[{"id":"t1","name":"...","desc":"...","bg_color":"#1a1a2e","text_color":"#eee","accent_color":"#e94560","font_family":"Sans"},'
            . '{"id":"t2","name":"...","desc":"...","bg_color":"#f0fdf4","text_color":"#14532d","accent_color":"#16a34a","font_family":"Sans"},'
            . '{"id":"t3","name":"...","desc":"...","bg_color":"#fff7ed","text_color":"#7c2d12","accent_color":"#ea580c","font_family":"Serif"}]}';

        try {
        $response = Http::withoutVerifying()
            ->timeout(90)
            ->post($this->baseUrl . $this->model . ':generateContent?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'role' => 'user', // Tambahkan role untuk best practice
                        'parts' => [['text' => $prompt]]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 8192,
                    'responseMimeType' => 'application/json', 
                ],
            ]);

        if ($response->successful()) {
            $data = $response->json();
            
            // Cara yang lebih aman mengambil teks pada mode JSON
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if ($text) {
                $decoded = json_decode($text, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    return $decoded;
                }
                Log::error('Gemini JSON Decode Error: ' . json_last_error_msg());
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
