package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.UserMessageMapper;
import work.likecu.share.model.UserMessage;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserMessageOperationService extends SameService<UserMessage> {


    @Resource
    private UserMessageMapper userMessageMapper;


    public UserMessage getUserMessage(Integer userId){
        return userMessageMapper.getUserMessage(userId);
    }

    public List<UserMessage> userMessageByName(String name){
        return (List<UserMessage>) userMessageMapper.getUserMessageByName(name);
    }

}
