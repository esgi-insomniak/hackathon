import Pocketbase from 'pocketbase';

export default class PocketbaseHelper {
    public static pocketbase: Pocketbase = new Pocketbase(process.env.VITE_POCKETBASE_URL);
}