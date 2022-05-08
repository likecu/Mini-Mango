package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;


@Data
@Table(name = "`card_vote_record`")
public class CardVoteRecord {

    @Column(name = "`vote_id`")
    private Integer voteId;

    @Column(name = "`user_id`")
    private Integer userID;

    private CardVoting cardVoting;

}
