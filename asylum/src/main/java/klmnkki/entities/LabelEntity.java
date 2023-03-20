package klmnkki.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "label", schema = "public")
public class LabelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "label_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany
    private Set<ArtistEntity> artists;
}
