package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.CardRecordMapper;
import work.likecu.share.model.CardRecord;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CardRecordOperationService extends SameService<CardRecord> {
    @Resource
    private CardRecordMapper cardRecordMapper;
    public List<CardRecord> getByUserId(Integer userId){
        return cardRecordMapper.getByUserId(userId);
    }
}
