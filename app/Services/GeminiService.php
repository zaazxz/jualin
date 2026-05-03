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

    public function generateSalesContent($productName, $description, $audience, $tone, $webName = null, $brandColor = null, $features = null, $price = null, $language = 'id')
    {
        $brandColor = $brandColor ?: '#10b981';
        $webName = $webName ?: $productName;
        $featuresText = $features ? "Unique Features/USPs: {$features}\n" : "";
        $priceText = $price ? "Price: {$price}\n" : "";

        $langInstructions = $language === 'en' ? 'ENGLISH' : ($language === 'ms' ? 'MALAY' : 'INDONESIAN');

        $prompt = "You are an expert Copywriter and Web Designer AI. First, analyze the provided Product Details, USPs, Target Audience, Tone, and Price. Give an overall score (0-100) on how compelling and complete the inputs are for marketing, and provide 2-3 short suggestions on how the user could improve their product offering or copywriting. Ensure these suggestions are ordered from the most critically important to the most optional.\n"
            . "IMPORTANT: All generated content, analysis, suggestions, and market research MUST be written in {$langInstructions} language.\n"
            . "Then, create a BREATHTAKING, PREMIUM, HIGH-CONVERSION Landing Page for: {$productName}.\n"
            . "Product Details: {$description}\n"
            . $featuresText
            . "Target Audience: {$audience} | Tone: {$tone}\n"
            . $priceText
            . "Brand Name: {$webName} | Primary Accent Color: {$brandColor}\n\n"
            . "CRITICAL UI/UX DESIGN RULES (Must Follow Strictly):\n"
            . "1. CREATIVITY & VARIETY: You MUST generate wildly different layouts, HTML structures, and Tailwind grids every time. Use asymmetrical grids, masonry layouts, split screens, zigzag sections, overlapping cards, etc. Do NOT output the same generic stack of sections. Be highly creative and dynamic.\n"
            . "2. LAYOUT: Use `min-h-screen`, generous padding (`py-24` to `py-32`), and max-width containers (`max-w-7xl mx-auto px-4 sm:px-6`).\n"
            . "3. TYPOGRAPHY: Use 'Inter' for body, 'Playfair Display' for headlines. Headlines must be massive and bold (`text-5xl md:text-7xl font-black tracking-tight`).\n"
            . "4. ADAPTIVE COLORS (CRUCIAL): Your HTML will be placed inside a <body> where the background and text color change dynamically (Light, Dark, Glass). DO NOT hardcode solid backgrounds like `bg-white` or `bg-slate-900` on large sections. Use `bg-black/5` or `bg-white/10`, `backdrop-blur-md`, and `text-inherit` so your design adapts perfectly to any template.\n"
            . "5. COMPONENTS: Include stunning Hero sections, interactive-looking Benefits cards with hover effects (`hover:-translate-y-2`), Testimonials, and a strong CTA footer.\n"
            . "6. HERO IMAGE: For 'hero_image', you MUST use a REAL, working Unsplash image URL (e.g. 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'). Use your vast knowledge to find an exact photo ID that matches the product. If you cannot remember a highly accurate Unsplash ID, use 'https://loremflickr.com/1200/800/{keyword_of_product},product' as a fallback. DO NOT generate fake/broken Unsplash IDs.\n\n"
            . "OUTPUT REQUIREMENTS:\n"
            . "Provide ONLY valid JSON. No markdown backticks.\n"
            . '{
                "copy": {"headline": "...", "subheadline": "...", "cta": "...", "hero_image": "VALID_IMAGE_URL", "web_name": "..."},
                "html_content": "<div class=\'w-full antialiased\'>... YOUR INCREDIBLE TAILWIND HTML HERE ...</div>",
                "analysis": {
                    "score": 95,
                    "seo_score": 88,
                    "copywriting_score": 92,
                    "ui_ux_score": 96,
                    "suggestions": [
                        "Saran 1...",
                        "Saran 2..."
                    ],
                    "improved_inputs": {
                        "description": "Rewritten, highly compelling product description that applies all your suggestions...",
                        "features": "Rewritten, expanded list of USPs that applies your suggestions...",
                        "price": "Optimized pricing text (e.g. Rp 99.000 (Diskon 50%))...",
                        "audience": "More specific and targeted audience description...",
                        "tone": "Optimized tone..."
                    },
                    "market_research": "Short market research about similar products...",
                    "target_audience_analysis": "Insights on the specific audience..."
                },
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

    public function generateDailyInsight($language, $userName)
    {
        $langInstructions = $language === 'en' ? 'ENGLISH' : ($language === 'ms' ? 'MALAY' : 'INDONESIAN');

        $prompt = "You are a top-tier Sales and Copywriting AI Consultant. Provide a daily, high-value, actionable insight for an entrepreneur named {$userName}.\n"
            . "IMPORTANT: The response MUST be written in {$langInstructions} language.\n\n"
            . "OUTPUT REQUIREMENTS:\n"
            . "Provide ONLY valid JSON. No markdown backticks. Example structure:\n"
            . '{
                "trend_title": "Sedang Tren di Pasaran",
                "trend_desc": "Short, interesting market trend going on right now...",
                "tip_title": "Tips Copywriting",
                "tip_desc": "A very practical, short, actionable copywriting or sales tip."
            }';

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . $this->model . ':generateContent?key=' . $this->apiKey, [
            'contents' => [
                ['parts' => [['text' => $prompt]]]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'response_mime_type' => 'application/json',
            ],
        ]);

        if ($response->successful()) {
            $candidates = $response->json('candidates');
            if (!empty($candidates)) {
                $text = $candidates[0]['content']['parts'][0]['text'] ?? '';
                $text = preg_replace('/```json\s*(.*?)\s*```/s', '$1', $text);
                $text = trim($text);

                try {
                    return json_decode($text, true);
                } catch (\Exception $e) {
                    Log::error("Failed to parse Gemini JSON: " . $e->getMessage(), ['text' => $text]);
                    return null;
                }
            }
        }

        Log::error("Gemini API Error: " . $response->body());
        return null;
    }

    public function checkApiStatus()
    {
        if (empty($this->apiKey)) {
            return ['status' => 'missing', 'message' => 'API Key tidak ditemukan di file .env'];
        }

        try {
            $response = Http::withoutVerifying()
                ->timeout(10)
                ->post($this->baseUrl . $this->model . ':generateContent?key=' . $this->apiKey, [
                    'contents' => [['parts' => [['text' => 'Respond with "pong"']]]],
                    'generationConfig' => [
                        'maxOutputTokens' => 10,
                    ],
                ]);

            if ($response->successful()) {
                return [
                    'status' => 'active', 
                    'message' => 'API Key Aktif',
                    'details' => 'Model: ' . $this->model
                ];
            }

            $error = $response->json('error.message') ?? 'Unknown Error';
            $status = $response->status();

            if ($status === 429) {
                return [
                    'status' => 'limit_reached', 
                    'message' => 'Limit Tercapai (429)',
                    'details' => 'Kuota harian/menit Gemini Free Tier sudah habis.'
                ];
            }

            if ($status === 403 || $status === 401) {
                return [
                    'status' => 'invalid', 
                    'message' => 'Key Tidak Valid (403)',
                    'details' => 'API Key salah atau sudah tidak berlaku.'
                ];
            }

            return [
                'status' => 'error', 
                'message' => 'API Error (' . $status . ')',
                'details' => $error
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error', 
                'message' => 'Koneksi Gagal',
                'details' => $e->getMessage()
            ];
        }
    }
}
