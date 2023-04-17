import cekotStel from "./CekotForm.module.css";
import { useRef, useState } from "react";

//validity pada input
const angka = 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 0;
const minChar = (val) => val.trim().length < 3;
const email = (val) => val.includes("@");
const notnomor = (val) => val.includes(angka);

const CekotForm = (props) => {
  //useref untuk conditional error paragraph
  const [cekInputValid, setCekInputValid] = useState({
    nama: true,
    addr: true,
    nowa: true,
    emai: true,
  });

  //ref untuk mengambil nilai akhir pada input
  const nameInputR = useRef();
  const addrInputR = useRef();
  const nowaInputR = useRef();
  const emailInputR = useRef();

  //ketika form submit
  const cuanDatang = (e) => {
    e.preventDefault();

    //mengambil value dari useref
    const namaR = nameInputR.current.value;
    const addrR = addrInputR.current.value;
    const nowaR = nowaInputR.current.value;
    const emailR = emailInputR.current.value;

    //validasi value dari ref dibadingkan dengan function
    const namaInputValid = !minChar(namaR);
    console.log(`minchar`, minChar(namaR));
    const addrInputValid = !minChar(addrR);
    const nowaInputValid = !minChar(nowaR) && notnomor(nowaR);
    const emailInputValid = !minChar(emailR) && email(emailR);
    console.log(`minchar email`, minChar(namaR));

    setCekInputValid({
      nama: namaInputValid,
      addr: addrInputValid,
      nowa: nowaInputValid,
      emai: emailInputValid,
    });

    const formSudahValid =
      namaInputValid && addrInputValid && nowaInputValid && emailInputValid;

    //jika form tak valid
    if (!formSudahValid) {
      return;
    }
    props.onSubForm({
      name: namaR,
      alamat: addrR,
      whatsapp: nowaR,
      emailnya: emailR,
    });
    nameInputR.current.value = "";
    addrInputR.current.value = "";
    nowaInputR.current.value = "";
    emailInputR.current.value = "";
  };

  //ngebagi-bagi invalid style dari masing-masing not valid value
  const kelasStyling1 = `${cekotStel.control} ${
    cekInputValid.nama ? "" : cekotStel.invalid
  }`;
  const kelasStyling2 = `${cekotStel.control} ${
    cekInputValid.addr ? "" : cekotStel.invalid
  }`;
  const kelasStyling3 = `${cekotStel.control} ${
    cekInputValid.nowa ? "" : cekotStel.invalid
  }`;
  const kelasStyling4 = `${cekotStel.control} ${
    cekInputValid.emai ? "" : cekotStel.invalid
  }`;

  return (
    <form onSubmit={cuanDatang} className={cekotStel.form}>
      <div className={kelasStyling1}>
        <label htmlFor="name">Nama Kamu: </label>
        <input id="name" type="text" ref={nameInputR} />
      </div>
      {!cekInputValid.nama && <p>Masukkan nama yang benar</p>}
      <div className={kelasStyling2}>
        <label htmlFor="alamat">Alamat Kamu: </label>
        <input id="alamat" type="text" ref={addrInputR} />
      </div>
      {!cekInputValid.addr && <p>Masukkan alamat yang benar</p>}
      <div className={kelasStyling3}>
        <label htmlFor="wa">Nomor WA Kamu: </label>
        <input id="wa" type="text" ref={nowaInputR} />
      </div>
      {!cekInputValid.nowa && <p>Masukkan nomor whatsapp yang benar</p>}
      <div className={kelasStyling4}>
        <label htmlFor="email">Email Kamu: </label>
        <input id="email" type="text" ref={emailInputR} />
      </div>
      {!cekInputValid.emai && <p>Masukkan email yang benar</p>}
      <div className={cekotStel.actions}>
        <button type="button" onClick={props.kensel}>
          Cancel
        </button>
        <button>Order</button>
      </div>
    </form>
  );
};

export default CekotForm;
