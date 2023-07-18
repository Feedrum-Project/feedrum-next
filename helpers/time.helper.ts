export default function getRelative(time: Date) {
    const now = new Date().setHours(0,0,0,0);
    const date = new Date(time.getTime()).setHours(0,0,0,0);
    const result = Math.round(now / date);

    const h: string = time.getHours().toString().length  == 1 ? "0" + time.getHours() : time.getHours().toString();
    const m: string = time.getMinutes().toString().length == 1 ? "0" + time.getMinutes() : time.getMinutes().toString();

    const hm = h+":"+m;

    return result === 1 ? "вчора в " + hm:
        result === 2 ? "позавчора в" + hm:
            result === -1 ? "завтра в" + hm:
                result === -2 ? "післязавтра в" + hm:
                    result === 0 ? "сьогодні в" + hm:
                        new Date().toLocaleString("uk");
}