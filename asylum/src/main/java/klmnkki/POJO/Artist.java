package klmnkki.POJO;

import klmnkki.entities.ArtistEntity;
import klmnkki.entities.LabelEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Artist {
    private Integer id;
    private String name;

    private Label label;

    public static ArtistEntity convertToEntity(Artist artist) {
        return new ArtistEntity(
                artist.getId(),
                artist.getName(),
                Label.convertToEntity(artist.getLabel()));
    }

    public static Artist convertToArtist(ArtistEntity artistEntity) {

        return new Artist(
                artistEntity.getId(),
                artistEntity.getName(),
                Label.convertToLabel(artistEntity.getLabelEntity()));
    }
}
