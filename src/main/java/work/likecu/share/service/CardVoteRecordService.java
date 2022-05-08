package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.CardVoteRecordMapper;
import work.likecu.share.model.CardVoteRecord;
import javax.annotation.Resource;
import java.util.List;

@Service
public class CardVoteRecordService extends SameService<CardVoteRecord>{
    @Resource
    private CardVoteRecordMapper cardVoteRecordMapper;
    public List<CardVoteRecord> getPublicVote(){
        return cardVoteRecordMapper.getPublicVote();
    }
}


