package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.LikeMessage;

public interface LikeMessageMapper extends Mapper<LikeMessage> {


    LikeMessage getLikeMessage(@Param("likeId") Integer likeId);
}