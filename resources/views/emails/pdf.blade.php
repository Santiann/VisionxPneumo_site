<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório da Análise e Raio-X</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            color: #0073e6;
            margin: 0;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>{{ $title }}</h1>
        </div>
        <div class="content">
            <p>{{ $messageContent }}</p>
        </div>
        <div class="footer">
            <p>Este é um e-mail automático. Por favor, não responda.</p>
            <p>&copy; {{ date('Y') }} VisionXPneumo. Todos os direitos reservados.</p>
        </div>
    </div>
</body>

</html>
