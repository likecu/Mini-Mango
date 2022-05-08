package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.CardMapper;
import work.likecu.share.model.CardVoting;

import javax.annotation.Resource;

@Service
public class CardVotingService extends SameService<CardVoting> {
    @Resource
    private CardMapper cardMapper;
    @Resource
    private CardVoting cardVoting;
}
