package klmnkki.POJO;

import klmnkki.entities.LabelEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Label {
    private Integer id;

    private String name;

    private Set<Artist> artists;

    public Label(String name, Set<Artist> artists) {
        this.name = name;
        this.artists = artists == null ? new HashSet<>() : artists;
    }

    public static LabelEntity convertToEntity(Label label) {
        if (label == null) {
            return null;
        }
        var artists = label.getArtists();
        return new LabelEntity(
                label.getId(),
                label.getName(),
                artists == null ? null : artists.stream().map(Artist::convertToEntity).collect(Collectors.toSet()));
    }

    public static Label convertToLabel(LabelEntity labelEntity) {
        if (labelEntity == null) {
            return null;
        }
        var artists = labelEntity.getArtists();
        return new Label(
                labelEntity.getId(),
                labelEntity.getName(),
                artists == null ? null : artists.stream().map(Artist::convertToArtist).collect(Collectors.toSet()));
    }
}
