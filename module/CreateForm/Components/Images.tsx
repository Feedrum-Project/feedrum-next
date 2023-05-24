import styles from "styles/create.module.sass";

import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import remove from "images/Remove.svg";
import edit from "images/Edit.svg";

interface IImages {
    files: File[] | undefined;
    setFiles: Dispatch<SetStateAction<File[] | undefined>>;
    showAdd?: boolean;
}

export default function Images({files, setFiles, showAdd=false}: IImages) {

    function upload(e: ChangeEvent<HTMLInputElement>) {
        const { files } = e.target;
        if(!files) return;

        setFiles((pr: File[] | undefined) =>  {
            if(pr !== undefined) {
                const buf = [...pr];
                return buf.concat(Array.from(files));
            } else return Array.from(files);
        });
    }

    return (
        <div className={styles.images}>
            <div className={styles.imagesList}>
                {
                    files?.map((file: File, index: number) => {
                        return (
                            <>
                                <div
                                    key={index}
                                    className={styles.imagesImage}>
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt="Завантажений малюнок"
                                        width={9.75*16}
                                        height={9.75*16}
                                        className={styles.imagesBackground}/>
                                    <div className={styles.board}>
                                        <button>
                                            <Image src={edit} alt="Відредагувати" width={14}/>
                                        </button>
                                        <button>
                                            <Image
                                                src={remove}
                                                alt="Видалити" width={14}
                                                onClick={() => {
                                                    const newList = files.filter(e => {
                                                        if(e === file ) return;
                                                        return e;
                                                    });
                                                    setFiles(newList);
                                                }}/>
                                        </button>
                                    </div>
                                </div>
                            </>
                        );
                    })
                }
                {
                    showAdd ?
                        <label
                            className={styles.imagesAddImage}>
                            <input
                                type="file"
                                onChange={e => upload(e)}
                                hidden
                                multiple
                            />
                            <div className={styles.imagesPlus}>+</div>
                            <h1 className={styles.imagesText}>Додати зображення</h1>
                        </label>
                        : null
                }
            </div>
        </div>
    );
}