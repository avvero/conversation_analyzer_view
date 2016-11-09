package com.avvero.conversation_analyzer_view.repository;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author Avvero
 */
@Component
public class MessageRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Document> findAllByConversation(String conversation) {
        Query query = new Query();
        query.with(new Sort(Sort.Direction.ASC, "timestamp"));
        query.addCriteria(Criteria.where("conversation").is(conversation));
        return mongoTemplate.find(query, Document.class, "toneAnalysis");
    }
}
