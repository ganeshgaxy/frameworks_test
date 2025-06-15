import { Question } from '../../core/question';
import { IActor } from '../../core/type';
import { GetByDtl, GetByLabel, GetByLocator } from './login.screen';

export class AdminAppHomeMenuIsVisible extends Question<boolean> {
    async answeredBy(actor: IActor): Promise<boolean> {
        return actor.page.getByTestId(GetByDtl.adminHomeMenuButton).isVisible();
    }
}

export class AdminAppHomeMenuIsNotVisible extends Question<boolean> {
    async answeredBy(actor: IActor): Promise<boolean> {
        return !actor.page.getByTestId(GetByDtl.adminHomeMenuButton).isVisible();
    }
}

export class WebAppHomeMenuIsVisible extends Question<boolean> {
    async answeredBy(actor: IActor): Promise<boolean> {
        await actor.expects(actor.page.locator(GetByLocator.webAppSpinner)).not.toBeVisible({ timeout: 10000 });
        return actor.page.getByLabel(GetByLabel.webAppHomeMenuButton).isVisible();
    }
}

export class WebAppHomeMenuIsNotVisible extends Question<boolean> {
    async answeredBy(actor: IActor): Promise<boolean> {
        return !actor.page.getByLabel(GetByLabel.webAppHomeMenuButton).isVisible();
    }
}
