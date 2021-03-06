package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.NoticeMessage;

import java.util.List;

public interface NoticeMessageMapper extends Mapper<NoticeMessage> {


    List<NoticeMessage> getAllNoticeById(@Param("userId") Integer userId);
}