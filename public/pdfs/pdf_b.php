<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF-02</title>
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
            <td class="full-width-title">Dados do paciente</td>
        </tr>
    </table>

    <hr>
    <br>

    <table>
        <tr>
            <td class="half-width"><strong>Nome:</strong><br> <?php echo $patientName; ?> </td>
            <td class="half-width"><strong>Sexo:</strong><br> <?php echo $patientGender; ?> </td>
            <td class="half-width"><strong>Idade:</strong><br> <?php echo $patientAge; ?> </td>
        </tr>
        <tr>
            <td class="half-width"><strong>Telefone:</strong><br> <?php echo $patientPhone; ?>
            <td class="half-width"><strong>CPF:</strong><br> <?php echo $patientCpf; ?> </td>
            <td class="half-width"><strong>Data de nascimento:</strong><br> <?php echo $patientBirthDate; ?> </td>
        </tr>
    </table> 

    <table>
        <tr>
            <td class="full-width-title">Relatório da análise de imagem</td>
        </tr>
    </table>

    <hr>
    <br>

    <table>
            <tr>
                <td class="half-width-info"><img src="<?php echo $imgSrcOriginal; ?>" alt="Imagem original" style="object-fit: cover; width: 200px;"><br><p>Imagem Original</p></td>
                <td class="half-width-info"><img src="<?php echo $imgSrcSinais; ?>" alt="Imagem sinais em destaque" style="object-fit: cover; width: 200px;"><br><p>Sinais em destaque</p></td>
                <td class="half-width-info"><img src="<?php echo $imgSrcCalor; ?>" alt="Imagem mapa de calor" style="object-fit: cover; width: 200px;"><br><p>Mapa de calor</p></td>
            </tr>
        </table> 

    <table style="width: 100%;">
        <tr>
            <td>
                <ul>
                    <li class="sub-title">Resultado</li>
                    <li style="font-size: 24px; text-align: left;"><?php echo $resultPneumonia; ?> </li>
                    <li style="text-align: left;">Acurácia da análise aproximada: <?php echo $accuracy; ?>%</li>
                    <li style="text-align: left;">Total de sinais encontrados: <?php echo $totalLobes; ?></li>
                </ul>
            </td>

            <td style="width: 50%; vertical-align: top;">
                <ul>
                    <li class="sub-title">Sinais de pneumonia</li>
                    <li class="li-border">Lobo superior direito: <?php echo $lobeTopRight; ?></li>
                    <li class="li-border">Lobo médio direito: <?php echo $lobeMiddleRight; ?></li>
                    <li class="li-border">Lobo inferior direito: <?php echo $lobeBottomRight; ?></li>
                    <li class="li-border">Lobo superior esquerdo: <?php echo $lobeTopLeft; ?></li>
                    <li class="li-border">Lobo inferior esquerdo: <?php echo $lobeBottomLeft; ?></li>
                    <br>                 
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