package work.likecu.share.service;


import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.CardMapper;
import work.likecu.share.model.Card;

import javax.annotation.Resource;

@Service
public class CardControlService extends SameService<Card> {
    @Resource
    private CardMapper cardMapper;
}
