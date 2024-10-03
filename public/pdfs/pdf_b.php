<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF-02</title>
</head>
<body>

    <table>
        <tr>
            <td class="full-width-title">Dados do paciente</td>
        </tr>
    </table>

    <hr>
    <br>

    <table>
        <tr>
            <td class="half-width"><strong>Nome:</strong><br> ... <!-- Nome do paciente --></td>
            <td class="half-width"><strong>Sexo:</strong><br> ... <!-- Sexo do paciente --></td>
            <td class="half-width"><strong>Idade:</strong><br> ... <!-- Idade do paciente --></td>
        </tr>
        <tr>
            <td class="half-width"><strong>Telefone:</strong><br> ... <!-- Telefone do paciente --></td>
            <td class="half-width"><strong>CPF:</strong><br> ... <!-- CPF do paciente --></td>
            <td class="half-width"><strong>Data de nascimento:</strong><br> ... <!-- Data nascimento do paciente --></td>
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
                <!-- Puxar a Imagem Original -->
                <td class="half-width-info"><img src="<?php echo $imgSrcOriginal; ?>" alt="Imagem original" style="object-fit: cover; width: 200px;"><br><p>Imagem Original</p></td>
                <!-- Puxar a Imagem Sinais -->
                <td class="half-width-info"><img src="<?php echo $imgSrcSinais; ?>" alt="Imagem sinais em destaque" style="object-fit: cover; width: 200px;"><br><p>Sinais em destaque</p></td>
                <!-- Puxar a Imagem Mapa de Calor -->
                <td class="half-width-info"><img src="<?php echo $imgSrcCalor; ?>" alt="Imagem mapa de calor" style="object-fit: cover; width: 200px;"><br><p>Mapa de calor</p></td>
            </tr>
        </table> 

        <table>
        <tr>
            <td class="full-width" style="page-break-inside: avoid;">
                <ul>
                    <li class="sub-title">Sinais de pneumonia</li>
                    <li>Total de sinais encontrados: ... <!-- O total dos sinais de pneumonia --></li>
                    <br>
                    <li class="sub-title">Resultado</li>
                    <li style="font-size: 24px">... <!-- adicionar dado referente, ex:  Alta Probabilidade de Pneumonia --></li>
                    <li>Acurácia da análise aproximada: ...<!-- adicionar a acuracia --></li>
                    <br>
                </ul>
            </td>
        </tr>
    </table>
    
</body>
</html>