package klmnkki.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "med_storage", schema = "public")
public class LabelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "label_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "label")
    private Set<ArtistEntity> artists;
}
