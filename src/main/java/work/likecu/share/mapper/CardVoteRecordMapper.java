package work.likecu.share.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;
import work.likecu.share.model.CardVoteRecord;

import java.util.List;

public interface CardVoteRecordMapper extends Mapper<CardVoteRecord> {
    List<CardVoteRecord> getPublicVote();
    List<CardVoteRecord> getVoteListById(@Param("cardId") Integer cardId);
}
