package work.likecu.share.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;

@Data
@Table(name = "`card_voting_message`")
public class CardVoting {
    @Column(name = "`voting_id`")
    private Integer votingId;

    @Column(name = "`card_id`")
    private Integer cardId;

    @Column(name = "`user_id`")
    private Integer userId;

    @Column(name = "`is_finished`")
    private Integer isFinished;

    @Column(name = "`create_time`")
    private Integer createTime;

    @Column(name = "`agree_number`")
    private Integer agreeNumber;
}

