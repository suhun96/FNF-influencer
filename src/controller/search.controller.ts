import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class SearchController {
    async search(req: IGetUserAuthInfoRequest, res: Response) {
        const sortOption = req.sortOption;
        const influencerListDown = req.influencerListDown;
        const influencerListUp = req.influencerListUp;
        if (sortOption === 'down') {
            influencerListDown;
            return res.status(200).send({
                message: 'Success',
                influencerList: influencerListDown,
            });
        } else {
            influencerListUp;
            return res
                .status(200)
                .send({ message: 'Success', influencerList: influencerListUp });
        }
    }
}

const searchController = new SearchController();
export default searchController;
