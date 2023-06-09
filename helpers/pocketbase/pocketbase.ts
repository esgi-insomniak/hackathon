import Pocketbase from 'pocketbase';

export default class PocketbaseHelper {
    public static pocketbase: Pocketbase = new Pocketbase(process.env.NEXT_POCKETBASE_URL);
}