import styles from "styles/create.module.sass";

import Image from "next/image";
import { useState, ChangeEvent } from "react";

import remove from "images/Remove.svg";
import edit from "images/Edit.svg";

interface IImages {
    files: File[] | undefined;
    setFiles: (files: File[]) => any;
    showAdd?: boolean;
}

export default function Images({files, setFiles, showAdd=false}: IImages) {

    function upload(e: ChangeEvent<HTMLInputElement>) {
        const { files } = e.target;
        if(!files) return;
        setFiles(Array.from(files));
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
                                    className={styles.imagesImage}
                                    style={
                                        {
                                            background: 'url('+URL.createObjectURL(file)+')',
                                            backgroundRepeat: 'no-repeat',
                                        }
                                    }>
                                    <button>
                                        <Image src={edit} alt="Відредагувати" width={14}/>
                                    </button>
                                    <button>
                                        <Image src={remove} alt="Видалити" width={14}/>
                                    </button>
                                </div>
                            </>
                        )
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
    )
}