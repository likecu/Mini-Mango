package work.likecu.share.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.NoticeMessageMapper;
import work.likecu.share.model.NoticeMessage;

import javax.annotation.Resource;
@Service
public class NoticeOperationService extends SameService<NoticeMessage> {


    @Resource
    private NoticeMessageMapper noticeMessageMapper;


    public PageInfo<NoticeMessage> getAllNoticeById(Integer userId, Integer pageNumber) {
        PageHelper.startPage(pageNumber, 15);
        return new PageInfo<NoticeMessage>(noticeMessageMapper.getAllNoticeById(userId));
    }
}
