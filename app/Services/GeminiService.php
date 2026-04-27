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

    public function generateSalesContent($productName, $description, $audience, $tone, $webName = null, $brandColor = null, $features = null, $price = null)
    {
        $brandColor = $brandColor ?: '#10b981';
        $webName = $webName ?: $productName;
        $featuresText = $features ? "Unique Features/USPs: {$features}\n" : "";
        $priceText = $price ? "Price: {$price}\n" : "";

        $prompt = "Create a BREATHTAKING, PREMIUM, HIGH-CONVERSION Landing Page for: {$productName}.\n"
            . "Product Details: {$description}\n"
            . $featuresText
            . "Target Audience: {$audience} | Tone: {$tone}\n"
            . $priceText
            . "Brand Name: {$webName} | Primary Accent Color: {$brandColor}\n\n"
            . "CRITICAL UI/UX DESIGN RULES (Must Follow Strictly):\n"
            . "1. USE TAILWIND CSS EXTENSIVELY. The page must look professionally designed, modern, and expensive.\n"
            . "2. LAYOUT: Use `min-h-screen`, generous padding (`py-24` to `py-32`), and max-width containers (`max-w-7xl mx-auto px-4 sm:px-6`).\n"
            . "3. TYPOGRAPHY: Use 'Inter' for body, 'Playfair Display' for headlines. Headlines must be massive and bold (`text-5xl md:text-7xl font-black tracking-tight`).\n"
            . "4. ADAPTIVE COLORS (CRUCIAL): Your HTML will be placed inside a <body> where the background and text color change dynamically (Light, Dark, Glass). DO NOT hardcode solid backgrounds like `bg-white` or `bg-slate-900` on large sections. Use `bg-black/5` or `bg-white/10`, `backdrop-blur-md`, and `text-inherit` so your design adapts perfectly to any template.\n"
            . "5. COMPONENTS:\n"
            . "   - Navbar: Sticky top, glassmorphism (`backdrop-blur-md bg-inherit/80`), clear Logo, elegant links, solid CTA button.\n"
            . "   - Hero: Stunning layout. The hero image MUST be wrapped beautifully (`rounded-3xl shadow-2xl ring-1 ring-white/10 overflow-hidden`).\n"
            . "   - Benefits: A clean grid (`grid-cols-1 md:grid-cols-3 gap-8`). Cards must have hover effects (`hover:-translate-y-2 transition-all`), soft borders (`border border-current/10`), and icons.\n"
            . "   - FAQ & Footer: Clean, minimalist, and easy to read.\n\n"
            . "OUTPUT REQUIREMENTS:\n"
            . "Provide ONLY valid JSON. No markdown backticks.\n"
            . '{
                "copy": {"headline": "...", "subheadline": "...", "cta": "...", "hero_image": "...", "web_name": "..."},
                "html_content": "<div class=\'w-full antialiased\'>... YOUR INCREDIBLE TAILWIND HTML HERE ...</div>",
                "templates": [
                    {"id": "t1", "name": "Light Premium", "bg_color": "#ffffff", "text_color": "#0f172a", "accent_color": "' . $brandColor . '", "font_family": "Sans"},
                    {"id": "t2", "name": "Dark Elegance", "bg_color": "#030712", "text_color": "#f8fafc", "accent_color": "' . $brandColor . '", "font_family": "Sans"},
                    {"id": "t3", "name": "Glassmorphism", "bg_color": "#0f172a", "text_color": "#ffffff", "accent_color": "' . $brandColor . '", "font_family": "Serif"}
                ]
            }';

        try {
            $response = Http::withoutVerifying()
                ->timeout(120)
                ->post($this->baseUrl . $this->model . ':generateContent?key=' . $this->apiKey, [
                    'contents' => [['role' => 'user', 'parts' => [['text' => $prompt]]]],
                    'generationConfig' => [
                        'temperature' => 0.8,
                        'maxOutputTokens' => 8192, // Pastikan tidak terpotong
                        'responseMimeType' => 'application/json', 
                    ],
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

                if ($text) {
                    // Bersihkan dari backticks markdown jika ada
                    $cleanText = trim($text);
                    if (preg_match('/^```json(.*)```$/s', $cleanText, $matches)) {
                        $cleanText = trim($matches[1]);
                    } elseif (preg_match('/^```(.*)```$/s', $cleanText, $matches)) {
                        $cleanText = trim($matches[1]);
                    }

                    $decoded = json_decode($cleanText, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        return ['success' => true, 'data' => $decoded];
                    }

                    Log::error('Gemini Invalid JSON Output: ' . $text);
                    Log::error('JSON Error Msg: ' . json_last_error_msg());
                }
                return ['success' => false, 'error' => 'Format JSON dari AI terpotong atau tidak valid. Silakan coba lagi.'];
            }

            $errorData = $response->json();
            $errorMessage = $errorData['error']['message'] ?? 'Unknown Error dari Gemini API';
            
            return [
                'success' => false, 
                'error' => "Gemini API ({$response->status()}): {$errorMessage}"
            ];

        } catch (\Exception $e) {
            return ['success' => false, 'error' => 'Exception: ' . $e->getMessage()];
        }
    }
}
