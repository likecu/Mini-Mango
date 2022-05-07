package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.model.CardRecord;

import javax.annotation.Resource;

@Service
public class CardRecordOperationService extends SameService<CardRecord> {
    @Resource
    private CardRecord cardRecord;
}
