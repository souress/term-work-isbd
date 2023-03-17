package klmnkki.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "artist", schema = "public")
public class ArtistEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "artist_id_seq")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "label_id", nullable = false)
    private LabelEntity label;
}
