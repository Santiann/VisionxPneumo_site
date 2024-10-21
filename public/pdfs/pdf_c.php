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
                <td class="half-width-info">Local: <?php echo $userEnterprise; ?> </td>
            </tr>
        </table> 
    </header>
    <table>
        <tr>
            <td class="full-width-title">Relatório do questionario de sintomas</td>
        </tr>
    </table>

    <hr>
    <br>

    <ol>
        <li class="li-strong">Você esta com febre? Se sim, qual é a sua temperatura?</li>
        <p>Resposta: Sim. Abaixo de 37,5.</p>
        <br>
        <li class="li-strong">Você esta com tosse? Se sim, a quanto tempo?</li>
        <p>Resposta: Sim. Menos de 3 dias. Catarro claro.</p>
        <br>
    </ol>

    <div style="padding-left: 20px">
        <p><strong>Observações:</strong></p>
        <div class="text-box">
            <p>Observações</p>
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