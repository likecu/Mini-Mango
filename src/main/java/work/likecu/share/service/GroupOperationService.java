package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.GroupMessageMapper;
import work.likecu.share.model.GroupMessage;

import java.util.List;
import javax.annotation.Resource;

@Service
public class GroupOperationService  extends SameService<GroupMessage> {

    @Resource
    private GroupMessageMapper groupMessageMapper;

    public List<GroupMessage> getGroupMembers(String id){
        return groupMessageMapper.getGroupMembers(id);
    }
    public List<GroupMessage> getUserGroups(Integer id){
        return groupMessageMapper.getUserGroups(id);
    }
    public void updateUserType(String string,Integer user,Integer type){
        groupMessageMapper.updateUserType(string,user,type);
    }

}
