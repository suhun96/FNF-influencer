import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class SearchController {
    async search(req: IGetUserAuthInfoRequest, res: Response) {
        const { sortOption, influencerListDown, influencerListUp, count } = req;
        if (sortOption === 'down') {
            return res.status(200).send({
                message: 'Success',
                result: influencerListDown,
                count,
            });
        } else {
            return res.status(200).send({
                message: 'Success',
                result: influencerListUp,
                count,
            });
        }
    }
}

const searchController = new SearchController();
export default searchController;
