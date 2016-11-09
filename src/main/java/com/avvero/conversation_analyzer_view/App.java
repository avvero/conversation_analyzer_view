package com.avvero.conversation_analyzer_view;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by fxdev-belyaev-ay on 03.11.16.
 */
@ComponentScan
@EnableAutoConfiguration
public class App {

    public static void main(String args[]) throws Throwable {
        SpringApplication.run(App.class, args);
    }
}
