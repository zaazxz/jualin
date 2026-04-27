<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @inertiaHead
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
    @routes('web')
</head>
<body class="font-sans antialiased bg-gray-50">
    @inertia
</body>
</html>