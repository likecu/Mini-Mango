package work.likecu.share.model;


import lombok.Data;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Table;

@Data
@Table (name = "`card_message`")
public class Card {
    @Column(name = "`card_id`")
    private Integer cardId;

    @Column(name = "'setting_time`")
    private Date settingTime;

    @Column(name = "`max_number`")
    private Integer maxNumber;

    @Column(name = "`card_info`")
    private String cardInfo;

    @Column(name = "`given_number`")
    private Integer givenNumber;

    @Column(name = "`card_name`")
    private String cardName;
}
