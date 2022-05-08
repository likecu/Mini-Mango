package work.likecu.share.model;

import io.swagger.models.auth.In;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "`card_record`")
public class CardRecord {
    @Column(name = "`card_id`")
    private Integer cardId;

    @Column(name = "'card_time`")
    private Date cardTime;

    @Column(name = "`card_is_useful`")
    private Integer cardIsUseful;

    @Column(name = "`user_id`")
    private Integer userID;

    private Card card;
}
