import * as React from "react";
import * as bulma from "bulma";
import { observer } from "mobx-react";
import { observable, action, computed, reaction } from "mobx";
import * as classNames from "classnames/bind";
import { bind } from "lodash-decorators";
import * as css from "./diff-blend.scss";

const cx = classNames.bind({ ...bulma, ...css });

export interface DiffSliderProps {
    received: string;
    snapshot: string;
    diff: string;
    width: number;
    height: number;
}

@observer
export class DiffBlend extends React.Component<DiffSliderProps> {
    @observable private diffOpacity = 0.5;
    @observable private blendOpacity = 0.5;

    @bind @action private handleDiffOpacity(event: React.SyntheticEvent<HTMLInputElement>) {
        this.diffOpacity = Number(event.currentTarget.value);
    }

    @bind @action private handleBlendOpacity(event: React.SyntheticEvent<HTMLInputElement>) {
        this.blendOpacity = Number(event.currentTarget.value);
    }

    public render() {
        const { received, snapshot, diff } = this.props;
        return (
            <>
                <nav className={cx("level", "settings")}>
                    <div className={cx("level-item", "has-text-centered")}>
                        <div>
                            <div className={cx("heading")}>Blend</div>
                            <input
                                className={cx("title")}
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={this.blendOpacity}
                                onChange={this.handleBlendOpacity}
                            />
                        </div>
                    </div>
                    <div className={cx("level-item", "has-text-centered")}>
                        <div>
                            <div className={cx("heading")}>Diff Opacity</div>
                            <input
                                className={cx("title")}
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={this.diffOpacity}
                                onChange={this.handleDiffOpacity}
                            />
                        </div>
                    </div>
                </nav>
                <div className={cx("viewer-container")}>
                    <div className={cx("viewer-diff")}>
                        <img src={diff} style={{ opacity: this.diffOpacity }} />
                    </div>
                    <div className={cx("viewer-received")} >
                        <img src={received} style={{ opacity: this.blendOpacity }} />
                    </div>
                    <div className={cx("viewer-snapshot")}>
                        <img src={snapshot} />
                    </div>
                </div>
            </>
        );
    }
}
