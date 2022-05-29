package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.SignRecordMapper;
import work.likecu.share.model.SignRecord;

import javax.annotation.Resource;

@Service
public class SignRecordService extends SameService<SignRecord> {
    @Resource
    private SignRecordMapper signRecordMapper;
}
