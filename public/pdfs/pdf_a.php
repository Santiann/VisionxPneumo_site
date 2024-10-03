
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF-01</title>
</head>

<body>

    <header>
        <table>
            <tr>
                <td class="half-width-info">Gerador: ... <!-- nome do medico --> </td>
                <td class="half-width-info">CRM: ... <!-- CRM do medico --> </td>
                <td class="half-width-info">Local: ... <!-- nome do hospital --> </td>
            </tr>
        </table> 
    </header>

    <table>
        <tr>
            <td class="full-width-title">Relatório da análise de imagem</td>
        </tr>
    </table>

    <hr>
    <br>

    <table>
        <tr>
            <!-- adicionar a: Imagem Original -->
            <td class="half-width"><img src="<?php echo $imgSrcOriginal; ?>" alt="Imagem Original" style="object-fit: cover; width: 200px; height: 200px;"></td>
            <!-- adicionar a: Imagem Mapa de Calor -->
            <td class="half-width"><img src="<?php echo $imgSrcCalor; ?>" alt="Imagem Mapa de Calor" style="object-fit: cover; width: 200px; height: 200px;"></td>
            <td class="legend">
                <p><span class="blue"></span> Baixa densidade</p>
                <p><span class="green"></span> Média densidade</p>
                <p><span class="orange"></span> Alta densidade</p>
            </td>
        </tr>
    </table>

    <br>

    <table>
        <tr>
            <!-- adicionar a: Imagem Sinais -->
            <td class="half-width"><img src="<?php echo $imgSrcSinais; ?>" alt="Imagem Sinais" style="object-fit: cover; width: 250px;"></td>
            <td class="half-width">
                <ul>
                    <li class="sub-title">Sinais de pneumonia</li>
                    <li class="li-border">Lobo superior direito: ...<!-- adicionar dado referente --></li>
                    <li class="li-border">Lobo médio direito: ...<!-- adicionar dado referente --></li>
                    <li class="li-border">Lobo inferior direito: ...<!-- adicionar dado referente --></li>
                    <li class="li-border">Lobo superior esquerdo: ...<!-- adicionar dado referente --></li>
                    <li class="li-border">Lobo inferior esquero: ...<!-- adicionar dado referente --></li>
                    <br>
                </ul>
                <hr>
                <p style="text-align: left;">Total de sinais encontrados: ...<!-- adicionar dado referente --></p>
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td class="full-width" style="page-break-inside: avoid;">
                <ul>
                    <li class="sub-title">Resultado</li>
                    <li style="font-size: 24px"> ...<!-- adicionar dado referente, ex:  Alta Probabilidade de Pneumonia --></li>
                    <li>Acurácia da análise aproximada: ...<!-- valor da acuracia --></li>
                </ul>
            </td>
        </tr>
    </table>

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