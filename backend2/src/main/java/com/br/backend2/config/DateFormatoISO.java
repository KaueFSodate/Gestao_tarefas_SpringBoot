package com.br.backend2.config;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatoISO {
    public static String formatarDataParaISO8601(Date data) {
        // Criar um objeto SimpleDateFormat com o formato desejado
        SimpleDateFormat formatoISO8601 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

        // Converter a data em uma string no formato ISO 8601
        String dataFormatada = formatoISO8601.format(data);

        return dataFormatada;
    }
}
