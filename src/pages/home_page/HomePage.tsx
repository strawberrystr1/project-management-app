import { Button, Typography } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { testDecrease, testIncreaseBy, testResetCount } from '../../store/reducers/testSlice';

const Home = () => {
  const { count } = useTypedSelector((state) => state.test);
  const dispatch = useTypedDispatch();

  return (
    <div>
      <div>{count}</div>
      <Button size="small" variant="contained" onClick={() => dispatch(testIncreaseBy(5))}>
        Increase by 5
      </Button>
      <Button
        size="small"
        variant="contained"
        color="info"
        onClick={() => dispatch(testDecrease())}
      >
        decrease by 1
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={() => dispatch(testResetCount())}
      >
        Reset
      </Button>
      <Typography>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum sequi, odit, quo
        consequuntur magni eos a excepturi id ab optio repudiandae obcaecati accusantium architecto
        doloremque commodi saepe esse laborum enim ad laudantium officia. Optio adipisci, esse nihil
        at dolorem quo magnam ut unde nesciunt autem nam illum, facilis amet minima deserunt
        consectetur placeat! Necessitatibus consequatur blanditiis ipsam maiores quos earum iste
        soluta provident saepe consectetur labore officia illum corrupti porro accusamus, excepturi
        sit quam dignissimos id dolore! Animi, architecto. Sequi natus sed voluptatem mollitia ipsam
        numquam laboriosam, sunt quibusdam, vero neque quas omnis, ut praesentium ab dicta
        temporibus excepturi nobis dignissimos aperiam soluta expedita illo? Eligendi ea perferendis
        dolorum sapiente, nobis vitae atque, tempore mollitia ad itaque reiciendis hic quaerat,
        aliquid aut laboriosam animi quas? Perspiciatis in sit, minus voluptas quos commodi facilis
        unde mollitia odit corporis doloribus expedita repellat enim dolorum magni deleniti corrupti
        modi delectus fugit ipsum consectetur. Sed placeat odit blanditiis natus sint officia quod
        alias harum adipisci corrupti sapiente perferendis, veritatis doloremque nihil quaerat
        cumque rerum ut assumenda. Quae numquam unde, cupiditate hic non minus totam facilis?
        Laudantium, inventore? Nemo expedita perferendis earum ut natus mollitia debitis! Nihil
        quisquam repudiandae autem iste laudantium voluptates aliquam ipsum eius, atque voluptatibus
        placeat aperiam libero nam maiores pariatur minima sint. Expedita beatae doloremque
        consectetur placeat molestias, officiis, quasi magni iusto cumque ea fugiat officia!
        Consequuntur dolore fuga iure asperiores dolorum labore est aliquam reprehenderit eligendi
        aliquid. Similique asperiores quos repudiandae incidunt maxime est officiis natus. Similique
        repudiandae repellendus a ratione provident libero excepturi ad, nam quis veniam quam.
        Placeat vel quaerat autem ex illo, nisi perspiciatis, reprehenderit similique, suscipit
        quasi illum atque eius fugiat deserunt corporis temporibus commodi repellendus quia
        consequatur eveniet. Fugit animi reprehenderit, nihil voluptas amet distinctio voluptatum
        dignissimos ex odit. Enim, maiores delectus! Beatae porro minima, accusantium facilis
        ducimus id voluptatibus nostrum sunt, tempore ipsum quaerat officiis sapiente. Consectetur
        rerum labore voluptas ullam veniam, in minima harum asperiores esse officia tenetur
        explicabo, rem autem blanditiis sunt quis totam quidem. Adipisci neque dicta ab, sed ullam
        autem hic. Modi, totam! Dolores voluptate et nisi atque mollitia aperiam maxime delectus
        dolore perferendis! Quaerat, velit veritatis! Nam adipisci doloremque ipsa incidunt ducimus
        amet ipsam! Pariatur minima similique ex quod quae ullam, sequi sapiente debitis suscipit
        labore eius esse aliquid! Alias temporibus cum aspernatur nostrum asperiores non aut illum
        quis voluptatibus tenetur qui, magnam deserunt, expedita harum enim laudantium veritatis
        molestiae odio reprehenderit consequuntur inventore! Architecto sint animi, dignissimos
        ducimus cupiditate sequi numquam officiis sapiente, vitae impedit amet quae debitis rerum
        eos nobis. Nulla pariatur nostrum in consequuntur molestias iste assumenda aliquid
        cupiditate nam quas sunt laboriosam, qui aut ut quaerat possimus ullam provident sed
        ducimus! Sunt, consequatur. Ipsam, quod in mollitia quo asperiores corrupti, doloremque
        porro iusto suscipit, dolorem quisquam minima autem debitis natus accusantium incidunt
        beatae culpa doloribus tenetur! Quae in labore suscipit nemo impedit. Vel magni qui a, quae,
        cumque facere maiores consequatur dicta fugit reiciendis itaque. Non vero alias, porro
        voluptates nulla blanditiis doloribus eligendi velit!
      </Typography>
    </div>
  );
};

export default Home;
