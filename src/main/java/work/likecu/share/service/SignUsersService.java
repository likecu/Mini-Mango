package work.likecu.share.service;

import org.springframework.stereotype.Service;
import work.likecu.share.basemapper.SameService;
import work.likecu.share.mapper.SignUsersMapper;
import work.likecu.share.model.SignUsers;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SignUsersService extends SameService<SignUsers> {

    @Resource
    private SignUsersMapper signUsersMapper;

    public List<SignUsers> getRank20(Integer id){
        return signUsersMapper.getRank20(id);
    }
}




