import { useEffect, useState } from "react";
import BookingForm from "../../Components/BookingForm";
import styles from "./styles.module.scss";
import { useFakeApi } from "../../Context/FakeApiContext";

export default function BookingPage() {
  const api = useFakeApi();
  const [maxTableSize, setMaxTableSize] = useState(0);

  useEffect(() => {
    (async () => {
      let mts = await api.getMaxTableSize();
      setMaxTableSize(mts);
    })();
  }, []);

  return (
    <>
      <main className={styles.bookingPageMain}>
        <BookingForm maxTableSize={maxTableSize} api={api} />
      </main>
    </>
  );
}
