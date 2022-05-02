package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.GroupMessage;

import java.util.List;

public interface GroupMessageMapper extends Mapper<GroupMessage> {
    List<GroupMessage> getGroupMembers(@Param("themeId") String themeId);
    List<GroupMessage> getUserGroups(@Param("userId") Integer userId);
    void updateUserType(@Param("themeId") String themeId,@Param("userId") Integer userId,@Param("userType") Integer userType);
    void inviteGroupMembers(@Param("themeId")String themeId,@Param("userId") Integer userId,@Param("userType") Integer userType);
}