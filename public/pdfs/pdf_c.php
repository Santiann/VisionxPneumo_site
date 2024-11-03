<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF-03</title>
</head>
<body>
<header>
    <table>
        <tr>
            <td class="half-width-info">Gerador: <?php echo $userName; ?>  </td>
            <td class="half-width-info">CRM: <?php echo $userCRM; ?> </td>
            <td class="half-width-info">Empresa: <?php echo $userEnterprise; ?> </td>
        </tr>
    </table> 
</header>
<table>
    <tr>
        <td class="full-width-title">Relatório do questionário de sintomas</td>
    </tr>
</table>

<hr>
<br>

<ol>
    <?php foreach ($questionario as $item): ?>
        <li class="li-strong"><?php echo htmlspecialchars($item['titulo']); ?></li>
        <p>Resposta: <?php echo htmlspecialchars($item['resposta']); ?></p>
        <br>
    <?php endforeach; ?>
</ol>

<div style="padding-left: 20px">
    <p><strong>Observações:</strong></p>
    <div class="text-box">
        <p><?php echo htmlspecialchars($observacao); ?></p>
    </div>
    <br>
</div>

<footer>
    <table>
        <tr>
            <td class="half-width"><?php echo date('d/m/Y'); ?></td>
            <td class="half-width"></td>
            <td class="half-width-company">VisionXPneumo</td>
        </tr>
    </table>
</footer>
    
</body>
</html>