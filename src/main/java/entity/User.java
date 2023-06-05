package entity;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "userId")
@Accessors(chain = true)
public class User {

    @Id
    @Column(name = "")
    @Type(type = "")
    @Setter(AccessLevel.NONE)
    private UUID userId;
}
