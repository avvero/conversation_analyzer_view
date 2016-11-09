package com.avvero.conversation_analyzer_view.controller;

import com.avvero.conversation_analyzer_view.repository.MessageRepository;
import com.google.gson.Gson;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by fxdev-belyaev-ay on 09.11.16.
 */
@RestController
@RequestMapping(value = "/api", method = RequestMethod.GET)
public class ApiController {

    @Autowired
    MessageRepository messageRepository;

    @RequestMapping(value = "/conversation/{conversation}", method = RequestMethod.GET)
    public Object findAllByConversation(@PathVariable String conversation) {
        List<Document> list = messageRepository.findAllByConversation(conversation);
        return new Gson().toJson(list);
    }

}
