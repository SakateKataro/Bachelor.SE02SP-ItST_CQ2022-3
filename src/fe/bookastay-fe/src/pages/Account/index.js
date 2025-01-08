import React, { useRef, useState } from "react";
import "./account.css";
import getFontSizes from "antd/es/theme/themes/shared/genFontSizes";
import { useSelector } from "react-redux";
import { formatDate } from "~/utils/datetime";

const AccountSetting = () => {
    const userInfo = useSelector((state) => state.account.userInfo);

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentField, setCurrentField] = useState("");
    const [currentValue, setCurrentValue] = useState("");
    const [personalDetails, setPersonalDetails] = useState({
        avatar:
            userInfo?.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        name: userInfo?.name || "Tran Thao Ngan",
        email: userInfo?.email || "ndjncscjdj@gmail.com",
        phone: userInfo?.phone || "0192837465",
        dob: formatDate(userInfo?.dob) || "01/01/2000",
        identify: userInfo?.cccd || "123456789412",
        password: "**********",
    });

    const fileRef = useRef(null);

    // Hàm mở modal
    const openModal = (field, value) => {
        setCurrentField(field);
        setCurrentValue(value);
        setModalOpen(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setModalOpen(false);
        setCurrentField("");
        setCurrentValue("");
    };

    // Hàm lưu thay đổi
    const handleSave = () => {
        if (currentField) {
            setPersonalDetails((prevDetails) => ({
                ...prevDetails,
                [currentField]: currentValue,
            }));

            // Gọi API cập nhật thông tin
        }
        closeModal();
    };

    const handleChangeAvatar = (e) => {
        fileRef.current.click();

        fileRef.current.onchange = (e) => {
            const file = e.target.files[0];

            const formData = new FormData();

            formData.append("file", file);
        };
    };

    return (
        <div className="m-5 py-5">
            <div className="row">
                <h1 className="mb-2 mt-3">Account Setting</h1>
                <div className="col-9" style={{ marginTop: "40px", marginBottom: "40px" }}>
                    {/* Personal Details */}
                    <section className="p-5 shadow me-5">
                        <h2>Personal details</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{personalDetails.name}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button
                                            onClick={() => openModal("name", personalDetails.name)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email address</td>
                                    <td>{personalDetails.email}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button
                                            onClick={() =>
                                                openModal("email", personalDetails.email)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone number</td>
                                    <td>{personalDetails.phone}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button
                                            onClick={() =>
                                                openModal("phone", personalDetails.phone)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Identify number</td>
                                    <td>{personalDetails.identify}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button
                                            onClick={() =>
                                                openModal("dob", personalDetails.identify)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of birth</td>
                                    <td>{personalDetails.dob}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button
                                            onClick={() => openModal("dob", personalDetails.dob)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
                <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                    <div
                        className="avatar-frame"
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                        }}
                    >
                        <img
                            src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/472219740_1936837300138014_2401011983813679479_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG6Fmr-BAQKdhh2ewaDivFosRYc2nCLHvuxFhzacIse-2uRmjAejNA4nBgfdDmQzbIaTKDnhaICQ5oDE7fVkWm7&_nc_ohc=ErLnqiDVoKwQ7kNvgHBkrVN&_nc_oc=AdhkO5jqzhPpwYA7roi8a2CGbn7kVSeOIRWiPrMHuRs_QTvl56H3uNzS1Mm-oFM743ZOV0aJWNER-n3kweF_QClX&_nc_zt=23&_nc_ht=scontent.fsgn8-1.fna&_nc_gid=A5noT5KVoCb-elQhCLTXe85&oh=00_AYDVpELzxAX2_3rzhoAKLwi82sMDQ5wNtMuc42R9krOuCA&oe=67849507"
                            alt="Avatar"
                            className="img-fluid shadow"
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                            }}
                        />
                    </div>
                    <button className="mt-2" onClick={(e) => handleChangeAvatar(e)}>
                        Change
                    </button>
                    <input ref={fileRef} type="file" className="d-none" />
                </div>
            </div>

            <button
                className="btn btn-danger my-5 fs-2"
                style={{ padding: "8px 20px", borderRadius: "10px" }}
            >
                Delete account permanently
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h2 className="mb-4">Edit {currentField}</h2>
                        <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                        />
                        <button
                            className="btn btn-primary fs-4 py-2 px-4"
                            onClick={handleSave}
                            style={modalStyles.buttonSave}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-danger fs-4 py-2 px-4"
                            onClick={closeModal}
                            style={modalStyles.buttonCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        background: "#fff",
        padding: "30px",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    buttonSave: {
        cursor: "pointer",
        marginRight: "15px",
        borderRadius: "4px",
    },
    buttonCancel: {
        cursor: "pointer",
        borderRadius: "4px",
    },
};

export default AccountSetting;
